export const NewSubmissions = async (submissionData, setSubmitSuccess) => {
  try {
    const response = await fetch('http://localhost:5000/patients/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: submissionData}),
    });


    const data = await response.json();

    if (!response.ok) {
      return console.log(data.message)
    }

    if(response.ok) {
      setSubmitSuccess(true);
    }

    console.log('Submitted successful', data);



  } catch (error) {
    console.error('Error sending submission:', error);
  }
};