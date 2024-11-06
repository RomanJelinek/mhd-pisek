import { Typography, Box } from "@mui/material";

export const Instructions = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Vítejte v dobrodružství po Písku!
      </Typography>
      <Typography variant="body1" paragraph>
        Vaše cesta začíná na <strong>Velkém náměstí</strong>. Tam, kde se
        střetává historie s dneškem, a kde na vás čeká první úkol! Přesuňte se
        tam a připravte se na dobrodružství, které vás povede ulicemi, parky a
        skrytými zákoutími města.
      </Typography>
      <Typography variant="body1" paragraph>
        Jakmile dorazíte na místo, <strong>odhalte první úkol</strong>. Ten vás
        provede prvními kroky této výpravy a nasměruje vás na další cíl. Po
        splnění každého úkolu se objeví nové instrukce, které vás posunou
        blíže k dalším záhadám města.
      </Typography>
      <Typography variant="body1">
        Připravte se na zážitky plné tajemství a objevů. Dobrodružství čeká –
        jste připraveni vyrazit?
      </Typography>
    </Box>
  );
};
