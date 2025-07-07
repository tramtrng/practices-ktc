import React, { useState } from 'react';
import "./App.css";
//Afternoon_W1_D5
// import ButtonClickCounter from './components/Afternoon_W1_D5/ButtonClickCounter';
// import InputFieldTracker from './components/Afternoon_W1_D5/InputFieldTracker';
// import ToggleSwitch from './components/Afternoon_W1_D5/ToggleSwitch';
// import HoverHighlight from './components/Afternoon_W1_D5/HoverHighlight';
// import HandlingFormSubmission from './components/Afternoon_W1_D5/HandlingFormSubmission';
// import KeyPressDisplay from './components/Afternoon_W1_D5/KeyPressDisplay';
// import DoubleClickMessage from './components/Afternoon_W1_D5/DoubleClickMessage';
// import DropdownSelection from './components/Afternoon_W1_D5/DropdownSelection';
// import CheckboxStatus from './components/Afternoon_W1_D5/CheckboxToggle';
// import ItemFilter from './components/Afternoon_W1_D5/ItemFilter';

//Homework_W1_D5
// import Calculator from "./components/Homework_W1_D5/Calculator";
// import RegistrationForm from "./components/Homework_W1_D5/RegistrationForm";
// import { CartProvider } from "./components/Homework_W1_D5/Shopping/components/CartContext";
// import { CartIcon } from './components/Homework_W1_D5/Shopping/components/CartIcon';
// import { CartDropdown } from './components/Homework_W1_D5/Shopping/components/CartDropdown';
// import { ProductGrid } from './components/Homework_W1_D5/Shopping/components/ProductGrid';

//Afternoon_W2_D6
import Customers from './components/Afternoon_W2_D6';

//Homework_W2_D6
// import WeatherApp from './components/Homework_W2_D6';

//Shopping
// const App: React.FC = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const toggleCart = () => {
//     setIsCartOpen((prev) => !prev);
//   }

//   return (
    <div>
      {/* <section>
      <div>
        <h2>Exercise 1: Button Click Counter</h2>
        <ButtonClickCounter />
      </div>
    <div>
        <h2>Exercise 2: Input Field Tracker</h2>
        <InputFieldTracker />
      </div>
      <div> 
        <h2>Exercise 3: Toggle Switch</h2>
        <ToggleSwitch />
      </div>
      <div>
        <h2>Exercise 4: Hover Highlight</h2>
        <HoverHighlight />
      </div> 
      <div> 
        <h2>Exercise 5: Handling Form Submission</h2>
        <HandlingFormSubmission />
      </div>
      <div> 
        <h2>Exercise 6: Key Press Display</h2>
        <KeyPressDisplay />
      </div>
      <div>
        <h2>Exercise 7: Double Click Message</h2>
        <DoubleClickMessage />
      </div>
      <div>
        <h2>Excersice 8: Dropdown Selection Fruit</h2>
        <DropdownSelection/>
      </div>
      <div>
        <h2>Excersice 9: Checkbox Status</h2>
        <CheckboxStatus/>
      </div>
      <div>
        <h2>Excercise 10: Item Filter</h2>
        <ItemFilter/>
      </div>
    </section> */}

{/*       <section>
        <div
          style={{
            display: "flex-col",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <h1>Simple Calculator</h1>
          <Calculator />
        </div>
        <div
          style={{
            display: "flex-col",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <h1>Registration Form</h1>
          <RegistrationForm />
        </div>

        <CartProvider>
          <h1>🛒 Big Market</h1>

          {/* Bọc CartIcon + CartDropdown trong khối có position: relative */}
          <div style={{ position: "relative" }}>
            <CartIcon onClick={toggleCart} />
            {isCartOpen && <CartDropdown isOpen={isCartOpen} />}
          </div>

          <h2 style={{ textAlign: 'left' }}>Thực phẩm khô</h2>
          <ProductGrid />
        </CartProvider>
      </section> */}
  //   </div>
  // );
  // };

function App() {

  return (
    <div>
      <Customers />
{/*       <WeatherApp /> */}
    </div>
  );
};
export default App;
