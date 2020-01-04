import { Router } from 'express';
import * as path from 'path';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrolmentController from './app/controllers/EnrolmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

// Authentication Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Index Route
routes.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

// Session Route
routes.post('/sessions', SessionController.store);

// Checkins Routes
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/checkins', CheckinController.store);

// HelpOrder
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.show);

// With this “use” statement the routes below will use middleware.
// The above routes will remain unused middleware
routes.use(authMiddleware);

// Users Route
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/students/help-orders', HelpOrderController.index);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

// Student Routes
routes.get('/students:q?', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Plan Routes
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// Enrolment Routes
routes.get('/enrolments', EnrolmentController.index);
routes.get('/enrolments/:id', EnrolmentController.show);
routes.post('/enrolments', EnrolmentController.store);
routes.delete('/enrolments/:id', EnrolmentController.delete);
routes.put('/enrolments/:id', EnrolmentController.update);

export default routes;
