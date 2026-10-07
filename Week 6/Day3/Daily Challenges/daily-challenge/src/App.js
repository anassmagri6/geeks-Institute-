import { useState } from 'react';
import FormComponent from './FormComponent';  

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    destination: '',
    nutsFree: false,
    lactoseFree: false,
    vegan: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === 'checkbox' ? checked : value; 

    setFormData(prevData => ({
      ...prevData,
      [name]: valueToUse
    }));
  };

  return (
    <div className='App'>
      <FormComponent data={formData} handleChange={handleChange} />
    </div>
  );
}

export default App;