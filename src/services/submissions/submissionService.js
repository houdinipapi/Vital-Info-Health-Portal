export const NewSubmissions = async (submissionData) => {
  try {
    const response = await fetch('http://localhost:8080/medicines/new-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    const data = await response.json();

    if (!response.ok) {
      return console.log(data.message)
    }

    console.log('Submitted successful', data);



  } catch (error) {
    console.error('Error sending submission:', error);
  }
};