// This will convert the entry type to a string value

export default function entryType(entryType: object): string {
  console.log(entryType.value)
  switch (parseInt(entryType.value)) {
    case 1:
      return "Debit";
    case 2:
      return "Credit";
    default:
      return "Unknown";
  }
}

export function entryTypeToString(entryType: any): string {
  switch (entryType) {
    case 1:
      return "Debit";
    case 2:
      return "Credit";
    default:
      return "Unknown";
  }
}

// For sending Mutations back to the backend
export function entryTypeToDb(entryType: string): number {
  switch (entryType) {
    case "Debit":
      return 1;
    case "Credit":
      return 2;
    default:
      return 0;
  }
}
