import { type } from "os";
import React, { useEffect, useState, useContext } from "react";
import IPerson from "../models/interfaces/IPerson";
import ISWOption from "../models/interfaces/ISWOption";
import { getAll, getAllNames, getById } from "../service/swAPI.service";
import useGetAllNames, { useGetAllNameProps } from "./hooks/useGetAllNames";
import useGetById from "./hooks/useGetById";
export interface SWAPIProviderProps {
  children: React.ReactNode;
}
export interface SWAPIProviderState {
  namesLoading: boolean;
  namesError: string | undefined;
  names: ISWOption[] | undefined;
  getSWNames: (search?: string) => void;
  personLoading: boolean;
  personError: string | undefined;
  person: IPerson | undefined;
  getSWByID: (id: string) => void;
}

export type SWAPIProviderType = {
  namesLoading?: boolean;
  namesError?: string | undefined;
  names?: ISWOption[] | undefined;
  getSWNames?: (search?: string) => void;
  personLoading?: boolean;
  personError?: string | undefined;
  person?: IPerson | undefined;
  getSWByID?: (id: string) => void;
};
export const SWAPIContext = React.createContext<SWAPIProviderType>({});

const SWAPIProvider = ({ children }: SWAPIProviderProps) => {
  const {
    loading: namesLoading,
    error: namesError,
    names,
    getSWNames,
  } = useGetAllNames(getAllNames);

  const {
    loading: personLoading,
    error: personError,
    person,
    getSWByID,
  } = useGetById(getById);

  return (
    <SWAPIContext.Provider
      value={{
        namesLoading,
        namesError,
        names,
        getSWNames,
        personLoading,
        personError,
        person,
        getSWByID,
      }}
    >
      {children}
    </SWAPIContext.Provider>
  );
};

export default SWAPIProvider;
