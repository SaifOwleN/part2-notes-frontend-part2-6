import PropTypes from 'prop-types'

const Login = ({
  loginToSite,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={loginToSite} className="mb-3">
      username:{' '}
      <input
        className="border-2 border-black"
        value={username}
        onChange={handleUsernameChange}
      />
      <br />
      password:{' '}
      <input
        className="border-2 border-black "
        value={password}
        onChange={handlePasswordChange}
      />
      <br></br>
      <button className="border-2 border-gray-400 rounded-md p-1" type="submit">
        login
      </button>
    </form>
  )
}
Login.propTypes = {
  loginToSite: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default Login
