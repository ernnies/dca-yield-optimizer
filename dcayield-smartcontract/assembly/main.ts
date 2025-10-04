import { Storage, Context, Args, generateEvent, transferCoins, u64 } from "@massalabs/as-asc";

export function deposit(_: Args): void {
  const caller = Context.caller();
  const amount = u64.fromUint64(Args.u64At(0));
  const userBalanceKey = `balance_${caller}`;

  let currentBalance = 0;
  const stored = Storage.get(userBalanceKey);
  if (stored.length > 0) {
    currentBalance = u64.fromString(stored);
  }
  const newBalance = currentBalance + amount;
  Storage.set(userBalanceKey, newBalance.toString());

  // Transfer coins to contract
  transferCoins(caller, Context.contractAddress(), amount);

  generateEvent(`Deposit: ${caller} deposited ${amount.toString()}`);
}

export function withdraw(_: Args): void {
  const caller = Context.caller();
  const amount = u64.fromUint64(Args.u64At(0));
  const userBalanceKey = `balance_${caller}`;

  const stored = Storage.get(userBalanceKey);
  assert(stored.length > 0, "Insufficient balance");
  const currentBalance = u64.fromString(stored);
  assert(currentBalance >= amount, "Insufficient balance");

  const newBalance = currentBalance - amount;
  Storage.set(userBalanceKey, newBalance.toString());

  // Transfer coins back
  transferCoins(Context.contractAddress(), caller, amount);

  generateEvent(`Withdrawal: ${caller} withdrew ${amount.toString()}`);
}

export function getBalance(_: Args): u64 {
  const caller = Context.caller();
  const userBalanceKey = `balance_${caller}`;
  const stored = Storage.get(userBalanceKey);
  if (stored.length === 0) {
    return u64.fromUint64(0);
  }
  return u64.fromString(stored);
}