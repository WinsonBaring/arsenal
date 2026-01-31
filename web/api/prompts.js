import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (!process.env.DATABASE_URL) {
        return res.status(500).json({ error: 'DATABASE_URL not set' });
    }

    const sql = neon(process.env.DATABASE_URL);

    try {
        if (req.method === 'GET') {
            const prompts = await sql`SELECT * FROM prompts ORDER BY created_at DESC`;
            return res.status(200).json(prompts);
        }

        if (req.method === 'POST') {
            const { name, description, content, category, author, version, tags } = req.body;
            if (!name || !content) return res.status(400).json({ error: 'Name and Content required' });

            // Ensure tags is an array for Postgres text[]
            const tagsArray = Array.isArray(tags) ? tags : [];

            const result = await sql`
        INSERT INTO prompts (name, description, content, category, author, version, tags)
        VALUES (${name}, ${description}, ${content}, ${category}, ${author}, ${version}, ${tagsArray})
        RETURNING *
      `;
            return res.status(201).json(result[0]);
        }

        if (req.method === 'PUT') {
            const { id, name, content, category, description } = req.body;
            if (!id) return res.status(400).json({ error: 'ID required' });

            const result = await sql`
        UPDATE prompts
        SET name = COALESCE(${name}, name),
            content = COALESCE(${content}, content),
            category = COALESCE(${category}, category),
            description = COALESCE(${description}, description),
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

            if (result.length === 0) return res.status(404).json({ error: 'Prompt not found' });
            return res.status(200).json(result[0]);
        }

        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
