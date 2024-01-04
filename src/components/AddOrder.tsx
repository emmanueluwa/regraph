import { useState } from "react";

export type AppProps = {
  customerId: number;
};

export default function AddOrder({ customerId }: AppProps) {
  //has the new order button been click? checking state
  const [active, setActive] = useState(false);

  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(NaN);

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
              console.log(customerId, description, cost);
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
              <label htmlFor="cost">Cost: </label>
              <input
                id="cost"
                type="number"
                value={isNaN(cost) ? "" : cost}
                onChange={(e) => {
                  setCost(parseFloat(e.target.value));
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

            <button>add order!</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
