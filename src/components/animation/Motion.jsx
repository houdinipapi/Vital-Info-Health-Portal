import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const MotionWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 130 }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;

// Define prop types for the MotionWrapper component
MotionWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
