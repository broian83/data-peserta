// Menggunakan native fetch (tersedia di Node 18+)
exports.handler = async (event) => {
  // Hanya izinkan metode POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { message } = JSON.parse(event.body);
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Key belum diset di Netlify Environment Variables!' })
    };
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `Anda adalah Aura, AI Assistant resmi PORMIKI untuk Webinar Nasional 18. 
            Gaya bicara: Professional, Ramah (Sapa dengan Rekan PMIK), Solutif, dan Singkat.
            Topik: E-Card (ada di menu bawah), Sertifikat (di Resource Center 3-5 hari lagi), 
            Update Nama (Hubungi Admin 0813-1341-0714).
            Gunakan Bahasa Indonesia yang baik.`
          },
          { role: "user", content: message }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 512
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return {
        statusCode: groqResponse.status,
        body: JSON.stringify({ error: data.error?.message || 'Error dari Groq AI' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Koneksi Server Gagal: ' + error.message })
    };
  }
};
