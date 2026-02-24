import { useState, useEffect } from 'react';

/**
 * useGeolocation Custom Hook
 *
 * This hook requests the user's current geographical position,
 * stores it in localStorage, and provides its status.
 *
 * @returns {object} An object containing:
 * - {object|null} userLocation: { latitude: number, longitude: number } if granted and available, null otherwise.
 * - {string} locationStatus: 'requesting', 'granted', 'denied', or 'error'.
 * - {string|null} locationError: Error message if status is 'denied' or 'error', null otherwise.
 */
const useGeolocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState('requesting'); // 'requesting', 'granted', 'denied', 'error'
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        // Check if location is already in localStorage (for subsequent page loads in same session)
        const storedLocation = localStorage.getItem('userLocation');
        if (storedLocation) {
            try {
                const parsedLocation = JSON.parse(storedLocation);
                setUserLocation(parsedLocation);
                setLocationStatus('granted');
                console.log('User location loaded from localStorage:', parsedLocation);
                return; // Exit if location is already found
            } catch (e) {
                console.error('Failed to parse stored location from localStorage:', e);
                localStorage.removeItem('userLocation'); // Clear corrupted data
            }
        }

        // Request user location if not found in localStorage or if it was corrupted
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationData = { latitude, longitude };
                    setUserLocation(locationData);
                    localStorage.setItem('userLocation', JSON.stringify(locationData));
                    setLocationStatus('granted');
                    setLocationError(null); // Clear any previous errors
                    console.log('User location granted and saved:', locationData);
                },
                (err) => {
                    console.warn(`Geolocation error (${err.code}): ${err.message}`);
                    if (err.code === err.PERMISSION_DENIED) {
                        setLocationStatus('denied');
                        setLocationError('Location access denied by user. Some features might be limited.');
                    } else {
                        setLocationStatus('error');
                        setLocationError(`Location error: ${err.message}.`);
                    }
                    localStorage.removeItem('userLocation'); // Clear any old stored location on error/denial
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for geolocation
            );
        } else {
            setLocationStatus('error');
            setLocationError('Geolocation is not supported by your browser.');
        }
    }, []); // Empty dependency array means this runs once on mount

    return { userLocation, locationStatus, locationError };
};

export default useGeolocation;
