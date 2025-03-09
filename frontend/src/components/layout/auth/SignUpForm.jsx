import { useState } from 'react';

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp= (e) => {
        e.preventDefault();
        console.log({ name, email, username, password });
    }


    return <form onSubmit={handleSihnUp}>
                <div>
                    <input
                        type='text'
                        placeholder='Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='input input-bordered w-full'
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='input input-bordered w-full'
                        required
                    />
                </div>
                <div>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input input-bordered w-full'
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        placeholder='Password (6+ characters)'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input input-bordered w-full'
                        required
                    />
                </div>
    </form>
}

export default SignUpForm;