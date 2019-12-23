import React, {useState} from 'react';
import s from './login-page.module.scss';


const LoginPage = (props) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        props.setLoggedIn(true);
        props.history.push('/catalog-page');
        setName('');
        setPassword('');
        e.preventDefault();
    };

    return (
        <div className={s.loginPageWrap}>
            <div className={s.loginPage}>
                <form onSubmit={submitHandler}>
                    <input type='text'
                           required minLength='5' maxLength='30'
                           placeholder={'Login'}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                    <input type='text'
                           required minLength='3' maxLength='30'
                           placeholder={'Password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Authorization</button>
                </form>
            </div>
        </div>
    )
};

export default LoginPage;