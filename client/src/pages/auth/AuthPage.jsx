import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const FormComponent = isLogin ? <LoginForm /> : <SignupForm />;
  const welcomeText = isLogin
    ? 'WELCOME BACK TO EXPENSELY!!'
    : 'WELCOME TO EXPENSELY!!';

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 font-poppins">
      <div className={`flex w-full h-full transition-all duration-500 ${!isLogin ? 'flex-row-reverse' : ''}`}>
        
        {/* Form Side */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white px-16">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              {isLogin ? 'Login' : 'Signup'}
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {FormComponent}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-sm text-gray-600">
                {isLogin ? (
                <>
                  New user?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Register now
                  </button>
                </>
             ) : (
                <>
                  Already a user?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Welcome Side */}
        <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center px-8">
          <motion.h1
            key={welcomeText}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold leading-tight whitespace-pre-line"
          >
            {welcomeText}
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
