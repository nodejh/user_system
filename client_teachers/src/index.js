import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva();

app.model(require('./models/index'));

app.model(require("./models/teacher"));

app.model(require("./models/record"));

app.model(require("./models/user"));

app.model(require('./models/login'));

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');