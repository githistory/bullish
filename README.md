# Bullish Bank

## Setup Steps

Before you begin, make sure you have nodejs version 18.0.0 installed and activated. There's a known bug with higher versions.

### 1. Clone repo and install dependencies

```
yarn install
```

### 2. Generate dynamic libs for data model

```
yarn db:generate
```

### 3. Create DB and seed it

```
yarn db:migrate
```

### 4. Run the app

```
yarn dev
```


## Potential Improvements

- The `From` and `To` fields of the Transfer form can be made comboboxes for easier account picking.
- `classnames` lib can be used to improve UX.
- GraphQL queries can be optimized so that only necessary data is sent down the wire.
- There should be client-side restrictions so that user input is limited to only valid data.
- There should be server-side validation, such as amount / currency checking, source / destination existence checking etc., to prevent user entering arbitrary data on the client side.
- This system only "books" the transactions and intentionally omits logics around account balance. There should be a post-trade system that processes the trades and executes the transactions (adding / deducting balances) according to their preset dates.
- User login / Transfer only from logged in user, etc.