import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const MotionWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 130 }}
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
