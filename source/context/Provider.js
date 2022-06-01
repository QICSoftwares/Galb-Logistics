import React, {useState, createContext} from 'react';

export const UserContext = createContext('Unknown');

const Provider = props => {
  const [name, setName] = useState('');
  const [fname, setFname] = useState('');
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [uid, setUid] = useState('');

  return (
    <UserContext.Provider
      value={{
        name: name,
        fname: fname,
        balance: balance,
        address: address,
        email: email,
        orders: orders,
        phonenumber: phonenumber,
        uid: uid,
        setName: setName,
        setBalance: setBalance,
        setAddress: setAddress,
        setEmail: setEmail,
        setOrders: setOrders,
        setPhonenumber: setPhonenumber,
        setUid: setUid,
        setFname: setFname,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default Provider;
