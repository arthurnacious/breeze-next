import React from "react";
import { Button } from "@mantine/core";
import ButtonGroup from "../ButtonGroup";
import { IconABOff, IconEdit } from "@tabler/icons";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";

function ActionsCellReverse(params) {
  return (
    <ButtonGroup>
      {params.pageMode == "view" ? (
        <Link href={`transaction/${params.data.transaction_code}`}>
          <Button
            leftIcon={<FaEye size={14} />}
            color="gray"
          >
            View
          </Button>
        </Link>
      ) : (
        <ReverseButton data={params.data} onReverse={params.onReverse} />
      )}
    </ButtonGroup>
  );
}

export function ActionsCellClients(params) {
  const router = useRouter();

  return (
    <ButtonGroup>
      {params.pageMode == "view" ? (
        <Button
          leftIcon={<FaEye size={14} />}
          color="gray"
          onClick={() => router.push(`/customers/${params.data.id}`)}
        >
          View
        </Button>
      ) : (
        <Button>Edit</Button>
      )}
    </ButtonGroup>
  );
}

function ReverseButton({ data, onReverse }) {
  if (!data.is_reversed && !data.is_reversal) {
    return (
      <Button
        leftIcon={<IconEdit size={14} />}
        color="teal"
        onClick={() => onReverse(data.id)}
      >
        Reverse
      </Button>
    );
  }

  if (!data.is_reversed && data.is_reversal) {
    return (
      <Button leftIcon={<IconABOff size={14} />} color="teal">
        Reversal Transaction
      </Button>
    );
  }

  return (
    <Button leftIcon={<IconABOff size={14} />} color="teal">
      Transaction Reversed
    </Button>
  );
}

export default ActionsCellReverse;
