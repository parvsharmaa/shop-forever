# Shop Forever 21

This is a fully functional e-commerce web application built using React for the frontend and Node (ExpressJS) for the backend. It allows users to browse products, add them to their cart, and complete purchases. The application also includes user authentication and order management functionalities.

## Features

- User authentication (login/register)
- Product catalog with detailed product views
- Cart functionality to manage selected items
- Checkout process with payment method selection and discount validation
- Users receive a coupon code after every nth order, which can be applied during checkout
- Order history to view past purchases
- Admin features for managing discount codes and viewing store statistics

## Technologies Used

- **Frontend**: React
- **Backend**: Node, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: Context API
- **Validation**: Validator
- **Styling**: Tailwind CSS

## API Endpoints

### User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Log in an existing user
- `GET /api/user/coupon` - Get the active coupon for the logged-in user (valid for every nth order)

### Product Routes

- `GET /api/product/list` - List all products
- `POST /api/product/add` - Add a new product (Admin only)
- `POST /api/product/single` - Get a single product by ID
- `POST /api/product/remove` - Remove a product (Admin only)

### Cart Routes

- `POST /api/cart/add` - Add an item to the user's cart
- `POST /api/cart/get` - Retrieve the user's cart
- `POST /api/cart/update` - Update cart item quantities

### Order Routes

- `POST /api/order/place` - Place an order, validating discount code before applying it
- `GET /api/order/userorders` - Get all orders for the logged-in user

### Admin Routes

- `POST /api/admin/login` - Authenticate the admin  
    - `REQUEST BODY: {"email": "admin@forever.com", "password": "AdminForever21"}`
    - `IDEAL RESPONSE: { "success": true, message ,token}`
- `POST /api/admin/generate-discount` - Generate a discount code for every nth order (Requires Admin Token)
- `GET /api/admin/stats` - Get store statistics (total items, purchase amounts, discount codes, etc.) (Requires Admin Token)

## Logical Flow for nth Order Discount Code

### Order Placement

1. Each time a user places an order, check if it’s the nth order (e.g., every 4th order).
2. If it is:
   - Generate a discount code and store it, associating it with the user’s account.

### Discount Code Availability

- If the user does not apply the discount code during checkout:
  - The discount code remains available for future use until it is either used or invalidated.
- If the user applies the discount code during the checkout process and it’s valid:
  - Apply the discount to the order.
  - Mark the discount code as used, so it cannot be used again.
  - Reset the counter for future discount eligibility.

### Next nth Order

- After the discount code has been used, the counter resets and starts counting for the next nth order.
- When the user places the next order that qualifies (the 5th order after the last discount code was used), generate a new discount code.

### Advantages of This Flow

- **User Incentivization**: Users feel encouraged to return and complete orders because they have a discount code they can still use.
- **Flexibility**: Users have the option to save their discount for later use if they choose not to apply it immediately.
- **Simple Management**: The logic for managing the discount code lifecycle (creation, application, resetting) is straightforward, making it easy to implement and maintain.

### Future Improvements

- **Expiration Policy**: Consider implementing an expiration policy for unused discount codes to prevent them from being available indefinitely.
- **Notification**: Consider notifying users about their available discount codes through email or app notifications to enhance engagement.

### Automatic Trigger on nth Order

- This functionality is automatically triggered whenever an order that qualifies for a discount (every nth order) is placed.
- The backend logic handles the generation of the discount code internally without requiring any manual intervention from the admin.

### Manual Trigger

- If you want to allow for manual generation (e.g., if the system needs a new code for some reason), the admin could call this endpoint directly.
- In such cases, an admin panel or a secured API testing tool like Postman could be used to make this call.
- The admin can only generate a new code for the user if the user does not already have a valid coupon code, and it can only be applied on the next nth order.

### Scenarios for Calling the Endpoint

- **Automated Flow**:
  - During the checkout process, after the order is validated and before finalizing the transaction, the backend can check if the order qualifies for a discount. If it does, it calls this endpoint to generate a new discount code.
- **Manual Management**:
  - The admin could use Postman to call this endpoint for generating discount codes at their discretion, perhaps to give away promotional codes or for special events.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.