import { authToken, email } from '../../../storage/storage';

export const updateProfileInfo = async (setProfileData, setSuccess) => {
  try {
    const requestBody = {
      email: email, 
    };

    const response = await fetch('http://localhost:8080/user/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile information');
    }

    const data = await response.json();
    setProfileData(data);
    setSuccess(true); 
    console.log('Profile information updated:', data);
  } catch (error) {
    console.error('Error updating profile information:', error.message);
    setSuccess(false); 
  }
};
