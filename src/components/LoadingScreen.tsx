import CircularProgress from '@mui/material/CircularProgress';
import Modal from './Modal';

const LoadingScreen = () => {
    return (
        <Modal className='tw-flex tw-flex-col tw-h-[100vh] tw-justify-center'>
            <div className='tw-flex tw-justify-center'>
                <CircularProgress size={70} />
            </div>
        </Modal>
    )
}

export default LoadingScreen;