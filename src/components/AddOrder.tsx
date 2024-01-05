import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export type AppProps = {
  customerId: number;
};

//get all customers with orders
const GET_DATA = gql`
  {
    customers {
      id
      name
      industry
      orders {
        id
        description
        totalInPence
      }
    }
  }
`;

//graphql query
const CREATE_ORDER = gql`
  mutation CREATE_ORDER(
    $description: String!
    $totalInPence: Int!
    $customer: ID
  ) {
    createOrder(
      customer: $customer
      description: $description
      totalInPence: $totalInPence
    ) {
      order {
        id
        customer {
          id
        }
        description
        totalInPence
      }
    }
  }
`;

export default function AddOrder({ customerId }: AppProps) {
  //has the new order button been click? checking state
  const [active, setActive] = useState(false);

  const [description, setDescription] = useState("");
  //TODO: invalid value 25000000000; Int cannot represent non 32-bit signed integer
  const [totalInPence, setTotalInPence] = useState(NaN);

  //graphql mutation
  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: GET_DATA }],
  });

  //checking for new successful order creation
  useEffect(() => {
    if (data) {
      console.log(data, "DATA!");
      setDescription("");
      setTotalInPence(NaN);
    }
  }, [data]);

  return (
    <div>
      {active ? null : (
        <button
          onClick={() => {
            setActive(true);
          }}
        >
          + New Order
        </button>
      )}
      {active ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createOrder({
                variables: {
                  customer: customerId,
                  description: description,
                  totalInPence: totalInPence * 100,
                },
              });
            }}
          >
            <div>
              <label htmlFor="description">Description: </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <br />

            <div>
              <label htmlFor="totalInPence">Cost: </label>
              <input
                id="totalInPence"
                type="number"
                value={isNaN(totalInPence) ? "" : totalInPence}
                onChange={(e) => {
                  setTotalInPence(parseFloat(e.target.value));
                }}
              />
            </div>
            <br />
            {/* 
            <button disabled={createCustomerLoading ? true : false}>
              Add Customer
            </button>
            {createCustomerError ? <p>Error creating customer</p> : null}
            */}

            <button disabled={loading ? true : false}>Add order!</button>
          </form>
          {error ? <p>Something went wrong</p> : null}
        </div>
      ) : null}
    </div>
  );
}
