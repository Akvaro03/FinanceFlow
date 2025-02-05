import typeUser from "@/types/typeUser";
import { useEffect, useState } from "react";

function useGetUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState(null);
  const [User, setUser] = useState<typeUser | null>(null);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const user: typeUser = {
      name: "Alvaro Ballarini",
      email: "alvaroballarini03@gmail.com",
      password: "123141512",
      balance: 40.354,
      transactions: [
        {
          id: 1,
          title: "Pago en Starbucks",
          amount: "-$500",
          icon: "local-cafe",
        },
        {
          id: 2,
          title: "Recarga de celular",
          amount: "-$1000",
          icon: "smartphone",
        },
        {
          id: 3,
          title: "Ingreso de dinero",
          amount: "+$5000",
          icon: "account-balance-wallet",
        },
      ],
    };
    setUser(user);
  }, [reset]);
  return { loading, err, User };
}

export default useGetUser;
