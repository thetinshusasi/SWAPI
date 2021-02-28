import Option from "../components/interfaces/Option";
import ISWOption from "../models/interfaces/ISWOption";

export function getOptionsFromSwNames(options: ISWOption[]): Option[] {
  if (!options || !options.length) return [];

  return options.map((item) => {
    return {
      label: item.name,
      value: `${item.id}`,
    };
  });
}

export function capitalize(s: string) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function removeInvalidValues(data: string): string {
  if (!data || data.trim().toLocaleLowerCase() === "n/a") return "?";
  return capitalize(data);
}
