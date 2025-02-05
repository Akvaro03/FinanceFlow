import typeTransaction from "./typeTransaction";

type typeUser = {
  name: string;
  email: string;
  password: string;
  balance: number;
  transactions: typeTransaction[];
};
export default typeUser;