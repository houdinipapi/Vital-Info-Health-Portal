export const NewSubmissions = async (submissionData, setSubmitSuccess) => {
  try {
    const response = await fetch('http://localhost:5000/patients/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: submissionData }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error submitting submission:', data.message);
    } else {
      setSubmitSuccess(true);
      console.log('Submitted successfully:', data);
    }

  } catch (error) {
    console.error('Error sending submission:', error);
  }
};

export const NewDiagnosisService = async (diagnosisData, setSubmitSuccess) => {
  try {
    const response = await fetch('http://localhost:5000/diagnosis/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diagnosisData),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.error('Error submitting diagnosis:', data.message);
    } else {
      setSubmitSuccess(true);
      console.log('Submitted successfully:', data);
    }

  } catch (error) {
    console.error('Error sending diagnosis:', error);
  }
};
