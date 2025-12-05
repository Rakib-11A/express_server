/**
 * Title: CRUD operation 
 * Description: Learning Express doing CRUD operation using postgres, neondb, typescritp
 * Author: Rakib Hasan
 * Date: 30/11/2025
 */
import app from './app';
import { config } from './config/env';

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
})
