import React, { useState } from "react";
import ISWOption from "../../models/interfaces/ISWOption";
export interface useGetAllNameProps {
  loading: boolean;
  error: string;
  names: ISWOption[] | undefined;
  getSWNames: (search?: string) => void;
}
const useGetAllNames = (
  getAllNameServiceFunc: (search?: string) => Promise<ISWOption[]>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [names, setNames] = useState<ISWOption[] | undefined>(undefined);

  const getSWNames = async (search?: string) => {
    try {
      setLoading(true);
      const data: ISWOption[] | undefined =
        (getAllNameServiceFunc && (await getAllNameServiceFunc(search))) ||
        undefined;
      setNames(data);
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
    names,
    getSWNames,
  };
};

export default useGetAllNames;
