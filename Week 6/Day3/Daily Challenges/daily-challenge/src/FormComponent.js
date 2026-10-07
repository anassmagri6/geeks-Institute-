import React from 'react';

function FormComponent({ data, handleChange }) {
  return (
    <main style={{ fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#DDAF7E' }}>
        <h1 style={{ backgroundColor: '#333', color: 'white', margin: 0, padding: '15px' }}>
          Sample form
        </h1>

        <form style={{ padding: '20px' }}>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            placeholder="First Name"
            onChange={handleChange}
            style={{ width: '400px', padding: '8px', marginBottom: '10px', display: 'block' }}
          />
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            style={{ width: '400px', padding: '8px', marginBottom: '10px', display: 'block' }}
          />
          <input
            type="number"
            name="age"
            value={data.age}
            placeholder="Age"
            onChange={handleChange}
            style={{ width: '400px', padding: '8px', marginBottom: '15px', display: 'block' }}
          />

          <label><input type="radio" name="gender" value="male" checked={data.gender === 'male'} onChange={handleChange} /> Male</label><br />
          <label><input type="radio" name="gender" value="female" checked={data.gender === 'female'} onChange={handleChange} /> Female</label><br /><br />

          <label style={{ fontWeight: 'bold' }}>Select your destination</label><br />
          <select name="destination" value={data.destination} onChange={handleChange} style={{ padding: '5px', margin: '5px 0 15px 0' }}>
            <option value="">-- Please Choose a destination --</option>
            <option value="Thailand">Thailand</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
          </select><br />

          <label style={{ fontWeight: 'bold' }}>Dietary restrictions:</label><br />
          <label><input type="checkbox" name="nutsFree" checked={data.nutsFree} onChange={handleChange} /> Nuts free</label><br />
          <label><input type="checkbox" name="lactoseFree" checked={data.lactoseFree} onChange={handleChange} /> Lactose free</label><br />
          <label><input type="checkbox" name="vegan" checked={data.vegan} onChange={handleChange} /> Vegan</label><br /><br />

          <button type="submit" style={{ padding: '8px 25px', fontWeight: 'bold', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>

      <hr style={{ margin: 0, border: 'none', height: '5px', backgroundColor: 'white' }} />

      <div style={{ backgroundColor: '#114B5F', color: 'white', padding: '20px' }}>
        <h2>Entered information:</h2>
        <p><i>Your name:</i> {data.firstName} {data.lastName}</p>
        <p><i>Your age:</i> {data.age}</p>
        <p><i>Your gender:</i> {data.gender}</p>
        <p><i>Your destination:</i> {data.destination}</p>
        <p><i>Your dietary restrictions:</i></p>
        <p><strong>**Nuts free :</strong> {data.nutsFree ? 'Yes' : 'No'}</p>
        <p><strong>**Lactose free :</strong> {data.lactoseFree ? 'Yes' : 'No'}</p>
        <p><strong>**Vegan meal :</strong> {data.vegan ? 'Yes' : 'No'}</p>
      </div>
    </main>
  );
}

export default FormComponent;