# Bullish Bank

## Setup Steps

Before you begin, make sure you have nodejs version 18.0.0 installed and activated.

### 1. Clone repo and install dependencies

```
yarn install
```

### 2. Generate dynamic libs

```
yarn prisma:generate
```

### 3. Create DB and seed it by running

```
yarn prisma:migrate
```

### 4. Run the app

```
yarn dev
```


## Potential Improvements

- The `From` and `To` fields of the Transfer form can be made comboboxes instead with account names being the label for easier picking.
- There should be client-side restriction so that user input is limited to only valid data.
- There should be server-side validation, such as amount / currency checking, source / destination existence checking etc., to prevent user entering arbitrary data on the client side.
- User login / Transfer only from logged in user, etc.