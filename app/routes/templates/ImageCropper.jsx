import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Button from '@mui/material/Button';
import getCroppedImg from '../utils/cropImage';
import '../../styles/cropper.css';

export default function ImageCropper({ imageSrc, onCropComplete, isOpen, onClose, title, children }) {

    if (!isOpen) {
        return null;
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropImage = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                background: '#333',
            }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={250 / 125}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropCompleteCallback}
                />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
            }}>
                {/* <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => onZoomChange(zoom)}
                /> */}
                <Button onClick={onCropImage} variant="contained" color="primary">
                    Crop Image
                </Button>
            </div>
        </div >
    );
}