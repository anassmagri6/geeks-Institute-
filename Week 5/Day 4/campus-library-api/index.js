import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/book.routes.js';
import memberRoutes from './routes/member.routes.js';
import loanRoutes from './routes/loan.routes.js';
import reportRoutes from './routes/report.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/loans', loanRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});