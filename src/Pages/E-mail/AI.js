import { OpenAI } from 'openai';


const openai = new OpenAI({
    apiKey:  process.env.REACT_APP_AI_API,
    dangerouslyAllowBrowser:true
  });

export const AiFunction = async (email, tone) =>
{
    try{
        const emailContent = email.content


        let toneDescription = '';
    switch (tone.toLowerCase()) {
      case 'casual':
        toneDescription = 'a casual, informal tone';
        break;
      case 'friendly':
        toneDescription = 'a friendly, approachable tone';
        break;
      case 'humor':
        toneDescription = 'a humorous, lighthearted tone';
        break;
      case 'formal':
        toneDescription = 'a professional, formal tone';
        break;
      default:
        toneDescription = 'a neutral tone';
        break;
    }


    const prompt = `
     Please reply the following email with a ${toneDescription}.
    
    Email Content: ${emailContent}

    Don't add Subject: Re: 
    Start with Hi
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4', 
    messages: [{ role: 'user', content: prompt }],
  });

  const generatedEmail = response.choices[0].message.content;
    return generatedEmail
  }
    catch(error){
        console.log(error)
  }
   
}