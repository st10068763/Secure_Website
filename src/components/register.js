import React, { useState } from 'react';
import { useNavigate } from 'react-router';
export default function Register() {
    const [form, setForm] = useState({
    name: "",
    password: "",
});
const navigate = useNavigate();
// This method will update the state properties.
function updateForm(value) {
   return setForm((prev) =>{
        return {
            ...prev,
            ...value,
        };
    });
}

// this funtion will handle the form submission.
async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the creat url, we will create a new user in the database.
    const newPerson = {...form};

    await fetch('https://localhost:3001/user/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
    .catch((error) => {
        window.alert("An error has occured: ${error}");
        return;
    });

    setForm({
        name: "",
        password: "",
    });
    navigate("/");
}
// This following selection will display the form that takes the input from the user
return(
    <div>
        <h3>Register</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
                />
    </div>
    <div className="form-group">
        <label htmlFor="Password">Password</label>
        <input
            type="password"
            className="form-control"
            id="password"
            value={form.position}
            onChange={(e) => updateForm({position: e.target.value})}
        />
    </div>

<div className='form-group'>
    <input 
    type="submit" 
    value="Create person" 
    className="btn btn-primary"
    />
 </div>
 </form>
</div>
);
}