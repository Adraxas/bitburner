// Root React Component for the Corporation UI
import React, { useState, useEffect } from "react";

import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { numeralWrapper } from "../../ui/numeralFormat";
import { Reputation } from "./Reputation";
import { KillScriptsModal } from "./KillScriptsModal";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import { Settings } from "../../Settings/Settings";
import { use } from "../Context";

interface IProps {
  save: () => void;
  killScripts: () => void;
}

function Intelligence(): React.ReactElement {
  const player = use.Player();
  const classes = useStyles();
  if (player.intelligence === 0) return <></>;
  return (
    <TableRow>
      <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
        <Typography classes={{ root: classes.int }}>Int&nbsp;</Typography>
      </TableCell>
      <TableCell align="right" classes={{ root: classes.cell }}>
        <Typography classes={{ root: classes.int }}>{numeralWrapper.formatSkill(player.intelligence)}</Typography>
      </TableCell>
      <TableCell align="right" classes={{ root: classes.cell }}>
        <Typography id="overview-int-hook" classes={{ root: classes.int }}>
          {/*Hook for player scripts*/}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

function Bladeburner(): React.ReactElement {
  const player = use.Player();
  const classes = useStyles();
  const bladeburner = player.bladeburner;
  if (bladeburner === null) return <></>;
  const action = bladeburner.getTypeAndNameFromActionId(bladeburner.action);
  if (action.type === "Idle") return <></>;
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>Bladeburner:</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>
            {action.type}: {action.name}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}

function Work(): React.ReactElement {
  const player = use.Player();
  const router = use.Router();
  const classes = useStyles();
  if (!player.isWorking || player.focus) return <></>;
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>Work&nbsp;in&nbsp;progress:</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" colSpan={2} classes={{ root: classes.cellNone }}>
          <Typography>
            +<Reputation reputation={player.workRepGained} /> rep
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row" align="center" colSpan={2} classes={{ root: classes.cellNone }}>
          <Button
            onClick={() => {
              player.startFocusing();
              router.toWork();
            }}
          >
            Focus
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cellNone: {
      borderBottom: "none",
      padding: 0,
      margin: 0,
    },
    cell: {
      padding: 0,
      margin: 0,
    },
    hp: {
      color: theme.colors.hp,
    },
    money: {
      color: theme.colors.money,
    },
    hack: {
      color: theme.colors.hack,
    },
    combat: {
      color: theme.colors.combat,
    },
    cha: {
      color: theme.colors.cha,
    },
    int: {
      color: theme.colors.int,
    },
  }),
);

export function CharacterOverview({ save, killScripts }: IProps): React.ReactElement {
  const [killOpen, setKillOpen] = useState(false);
  const player = use.Player();

  const setRerender = useState(false)[1];

  useEffect(() => {
    const id = setInterval(() => setRerender((old) => !old), 600);
    return () => clearInterval(id);
  }, []);

  const classes = useStyles();
  return (
    <>
      <Table sx={{ display: "block", m: 1 }}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.hp }}>HP&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.hp }}>
                {numeralWrapper.formatHp(player.hp)}&nbsp;/&nbsp;{numeralWrapper.formatHp(player.max_hp)}
              </Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-hp-hook" classes={{ root: classes.hp }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.money }}>Money&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.money }}>{numeralWrapper.formatMoney(player.money)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-money-hook" classes={{ root: classes.money }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
              <Typography classes={{ root: classes.hack }}>Hack&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cell }}>
              <Typography classes={{ root: classes.hack }}>{numeralWrapper.formatSkill(player.hacking)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cell }}>
              <Typography id="overview-hack-hook" classes={{ root: classes.hack }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>Str&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>{numeralWrapper.formatSkill(player.strength)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-str-hook" classes={{ root: classes.combat }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>Def&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>{numeralWrapper.formatSkill(player.defense)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-def-hook" classes={{ root: classes.combat }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>Dex&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.combat }}>{numeralWrapper.formatSkill(player.dexterity)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-dex-hook" classes={{ root: classes.combat }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
              <Typography classes={{ root: classes.combat }}>Agi&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cell }}>
              <Typography classes={{ root: classes.combat }}>{numeralWrapper.formatSkill(player.agility)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cell }}>
              <Typography id="overview-agi-hook" classes={{ root: classes.combat }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.cha }}>Cha&nbsp;</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography classes={{ root: classes.cha }}>{numeralWrapper.formatSkill(player.charisma)}</Typography>
            </TableCell>
            <TableCell align="right" classes={{ root: classes.cellNone }}>
              <Typography id="overview-cha-hook" classes={{ root: classes.cha }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>
          <Intelligence />

          <TableRow>
            <TableCell component="th" scope="row" classes={{ root: classes.cell }}>
              <Typography id="overview-extra-hook-0" classes={{ root: classes.hack }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="right" classes={{ root: classes.cell }}>
              <Typography id="overview-extra-hook-1" classes={{ root: classes.hack }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row" align="right" classes={{ root: classes.cell }}>
              <Typography id="overview-extra-hook-2" classes={{ root: classes.hack }}>
                {/*Hook for player scripts*/}
              </Typography>
            </TableCell>
          </TableRow>
          <Work />
          <Bladeburner />

          <TableRow>
            <TableCell align="center" classes={{ root: classes.cellNone }}>
              <IconButton onClick={save}>
                <SaveIcon color={Settings.AutosaveInterval !== 0 ? "primary" : "error"} />
              </IconButton>
            </TableCell>
            <TableCell align="center" classes={{ root: classes.cellNone }}>
              <IconButton onClick={() => setKillOpen(true)}>
                <ClearAllIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <KillScriptsModal open={killOpen} onClose={() => setKillOpen(false)} killScripts={killScripts} />
    </>
  );
}
