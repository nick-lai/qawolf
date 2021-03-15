import { Box } from "grommet";
import { useContext, useEffect, useState } from "react";

import { useOnboarding } from "../../../hooks/queries";
import Spinner from "../../shared/Spinner";
import { UserContext } from "../../UserContext";
import { getOpenSection, Section as SectionType } from "./helpers";
import Sections from "./Sections";
import Welcome from "./Welcome";

type Props = { teamId: string };

const maxWidth = "800px";

export default function GetStarted({ teamId }: Props): JSX.Element {
  const { user, wolf } = useContext(UserContext);
  const [openSection, setOpenSection] = useState<SectionType | null>(null);

  const { data } = useOnboarding({ team_id: teamId });
  const onboarding = data?.onboarding || null;

  useEffect(() => {
    if (!onboarding) return;
    setOpenSection(getOpenSection(onboarding));
  }, [onboarding]);

  const completeCount = onboarding
    ? // filter that it equals true since typename is also included
      Object.values(onboarding).filter((v) => v === true).length
    : 0;

  const handleToggleOptn = (section: SectionType): void => {
    setOpenSection((prev) => {
      if (prev === section) return null;
      return section;
    });
  };

  const innerHtml = onboarding ? (
    <Box flex={false} pad={{ horizontal: "medium" }} style={{ maxWidth }}>
      <Welcome
        completeCount={completeCount}
        isOpen={!!openSection}
        wolfColor={wolf?.variant}
      />
      <Sections
        onToggleOpen={handleToggleOptn}
        onboarding={onboarding}
        openSection={openSection}
        teamId={teamId}
        userId={user?.id}
      />
    </Box>
  ) : (
    <Spinner />
  );

  return (
    <Box
      align="center"
      background="gray2"
      overflow={{ vertical: "auto" }}
      pad={{ vertical: "xxlarge" }}
      width="full"
    >
      {innerHtml}
    </Box>
  );
}
