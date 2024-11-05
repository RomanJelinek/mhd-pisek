import { useUser } from '@/context/UserContext';
import { TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

export const Name = () => {
  const { nickname, setNickname } = useUser();

  const handleSetNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <>
      <Typography sx={{ marginBottom: 3 }}>
        Vítejte ve hře, která vás provede dobrodružstvím vašeho města! 🌍
        Připravte se objevovat skryté příběhy, plnit zajímavé úkoly a překonávat
        výzvy na cestě za poznáním. Zadejte své jméno, vyberte si svoji ikonu a
        vydejte se na cestu, která vám ukáže vaše okolí v úplně novém světle.
        Začněte tím, že zadáte jméno hráče
      </Typography>
      <TextField
        onChange={handleSetNickname}
        value={nickname}
        label="Zadej jméno hráče"
        variant="standard"
      />
    </>
  );
};
