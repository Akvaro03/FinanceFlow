import typeIconsName from "./typeIconsName";
type typePaymentMethods = {
  name:string,
  icon:string
}

type typeTransaction = {
  id: number;
  title: string;
  amount: string;
  icon: typeIconsName;
  paymentMethods: typePaymentMethods
};


export default typeTransaction;