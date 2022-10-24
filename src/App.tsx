import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { defaultTheme } from './styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant="success" />
      <Button variant="danger" />
      <Button variant="secondary" />
    </ThemeProvider>
  );
}
