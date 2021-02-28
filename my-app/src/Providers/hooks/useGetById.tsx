import React, { useState } from "react";
import IPerson from "../../models/interfaces/IPerson";
export interface useGetAllNameProps {
  loading: boolean;
  error: string;
  person: IPerson[] | undefined;
  getSWByID: (search?: string) => void;
}
const useGetById = (getByIdServiceFunc: (id: string) => Promise<IPerson>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [person, setPerson] = useState<IPerson | undefined>(undefined);

  const getSWByID = async (id: string) => {
    try {
      setLoading(true);
      const data: IPerson | undefined =
        (getByIdServiceFunc && (await getByIdServiceFunc(id))) || undefined;
      setPerson(data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(error);
      console.log(err);
    }
  };

  return {
    loading,
    error,
    person,
    getSWByID,
  };
};

export default useGetById;
