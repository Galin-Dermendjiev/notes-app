import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../prismaClient.js';

const router = express.Router();

// GET all notes for the user
router.get('/', async (req, res) => {
    try {
        const notes = await prisma.note.findMany({
            where: {
                userId: req.userId
            }
        });

        // Format the date to DD/MM/YYYY before returning to the client
        const formattedNotes = notes.map(note => {
            note.date = formatDateForDisplay(note.date);
            return note;
        });

        res.json(formattedNotes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong when getting all notes." });
    }
});

// POST a new note
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'), 
        body('content').notEmpty().withMessage('Content is required') 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content } = req.body;
        const currentDate = new Date(); 

        try {
            const newNote = await prisma.note.create({
                data: {
                    title,
                    content,
                    date: currentDate, 
                    userId: req.userId
                }
            });

            res.json({ id: newNote.id, title, content, date: currentDate });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong creating note." });
        }
    }
);

// PUT update an existing note
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    const id = parseInt(req.params.id, 10)
    const currentDate = new Date()

    try {
        const updatedNote = await prisma.note.update({
            where: {
                id,
                userId: req.userId
            },
            data: {
                title,
                content,
                date: currentDate
            }
        });

        res.json(updatedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong when updating note." });
    }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const userId = req.userId;

    try {
        await prisma.note.delete({
            where: {
                id,
                userId: req.userId
            }
        });

        res.json({ message: 'Note deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong when deleting note." });
    }
});

// Helper function to format the date from YYYY-MM-DD to DD/MM/YYYY
function formatDateForDisplay(date) {
    if (!(date instanceof Date)) {
        date = new Date(date); // Ensure it's a Date object
    }

    return date.toISOString().split('T')[0].split('-').reverse().join('/'); 
}

export default router;
