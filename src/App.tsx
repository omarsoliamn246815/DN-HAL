CREATE OR REPLACE FUNCTION public.spend_my_diamonds(p_amount bigint)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_balance bigint;
  v_uid uuid;
BEGIN
  v_uid := auth.uid();

  IF v_uid IS NULL OR p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Invalid request';
  END IF;

  UPDATE public.wallets
  SET diamonds = diamonds - p_amount,
      updated_at = now()
  WHERE user_id = v_uid
    AND diamonds >= p_amount
  RETURNING diamonds INTO v_balance;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  INSERT INTO public.wallet_ledger (
    user_id, diamonds_change, coins_change
  )
  VALUES (v_uid, -p_amount, 0);

  RETURN v_balance;
END;
$$;

REVOKE ALL ON FUNCTION public.spend_my_diamonds(bigint)
FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.spend_my_diamonds(bigint)
TO authenticated;
