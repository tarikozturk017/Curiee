const jwt = require('jsonwebtoken');
const Logout = (props) => {

    // const token = localStorage.getItem('token');

    // if (token) {
    // try {
    //     const decodedToken = jwt.decode(token);
    //     const patientId = decodedToken.patientId;
    //     console.log(patientId);
    // } catch (error) {
    //     console.log('Invalid token', error);
    // }
    // } else {
    // console.log('No token found');
    // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    // console.log(localStorage)
    console.log('successfully logged out')
  };

  return (
    <div className=' mx-auto rounded-lg p-5 bg-blue-100 max-w-max text-center'>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">Log out</button>
      </form>

    </div>
  );
};

export default Logout;
