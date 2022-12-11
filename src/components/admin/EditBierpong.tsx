import { useEvents, useEvent, useTeams } from "../../hooks/queries";
import { EventProps } from "../../types";
import { useState } from "react";
import dayjs from "dayjs";
import img from "../../assets";
import Modal from "../Modal";
function EditBierpong(props: any) {
  const bierpong = useEvents();
  const [selectedTourneyId, setSelectedTourneyId] = useState<number>(0);
  const [editmodalVisible, setEditModalVisible] = useState<boolean>(false);
  const [addmodalVisible, setAddModalVisible] = useState<boolean>(false);

  const turnier = useEvent(
    "bierpong",
    selectedTourneyId,
    selectedTourneyId !== 0
  );
  const teams = useTeams(turnier.data?.bpid, turnier.isSuccess);
  if (turnier.isError) {
    return (
      <div className="text-red-500">
        Turnierdaten konnten nicht geladen werden.
      </div>
    );
  }
  if (teams.isError) {
    return (
      <div className="text-red-500">
        Teamdaten konnten nicht geladen werden.
      </div>
    );
  }
  if (bierpong.isError) {
    return (
      <div className="text-red-500">Events konnten nicht geladen werden.</div>
    );
  }
  console.log(turnier.data);
  console.log(teams.data);
  console.log(bierpong.data);
  return (
    <div className="w-full relative rounded-lg">
      {bierpong.isSuccess &&
        selectedTourneyId === 0 &&
        bierpong.data
          .filter((event: EventProps) => event.type === "bierpong")
          .map((bp: EventProps) => (
            <div
              className="h-24 bg-slate-800 px-2 mx-2 rounded-lg cursor-pointer hover:drop-shadow-xl drop-shadow-lg flex"
              key={bp.eventid}
              onClick={() => setSelectedTourneyId(bp.eventid)}
            >
              <div className=" grow flex-col flex bg-slate-800 rounded-lg text-slate-200">
                <div className="text-2xl">{bp.name}</div>
                <div className="text-sm truncate max-w-sm md:max-w-md lg:max-w-lg">
                  {bp.description}
                </div>
                <div className="w-full flex mt-2">
                  <div className="flex items-center text-sm">
                    {img.Icons.clock("w-5 h-5")}
                    <span className="w-3" />
                    {dayjs(bp.start).format("DD.MM.YYYY HH:mm")}
                  </div>
                  <span className="w-6" />
                  <div className="flex items-center text-sm">
                    {img.Icons.house("w-5 h-5")}
                    <span className="w-3" />
                    {bp.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
      {selectedTourneyId !== 0 &&
        bierpong.isSuccess &&
        turnier.isSuccess &&
        teams.isSuccess && (
          <div className="flex items-center flex-col">
            <div
              className="absolute top-4 left-4 w-12 h-12 rounded-3xl flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSelectedTourneyId(0);
              }}
            >
              {img.Icons.arrowLeft("w-8 h-8 text-white")}
            </div>
            <div className="mt-6 text-2xl">
              Bierpongturnier am{" "}
              {dayjs(
                bierpong.data.filter(
                  (evt: EventProps) => evt.eventid === selectedTourneyId
                )[0].start
              ).format("DD.MM.YYYY")}
            </div>
            <div className="flex mt-20 w-full justify-evenly">
              <div className="h-20 w-48 flex flex-col items-center justify-center rounded-lg">
                <div>Registrierte Teams:</div>
                <div>
                  {teams.data.length} / {turnier.data.teams_amt}
                </div>
              </div>
              <div
                onClick={() => setEditModalVisible(true)}
                className="h-20 w-48 bg-slate-800 flex flex-col items-center text-center cursor-pointer hover:drop-shadow-xl drop-shadow-lg justify-center rounded-lg"
              >
                Teams bearbeiten
              </div>
              <div
                onClick={() => setAddModalVisible(true)}
                className="h-20 w-48 bg-slate-800 flex flex-col items-center text-center cursor-pointer hover:drop-shadow-xl drop-shadow-lg justify-center rounded-lg"
              >
                Fehlende Teams hinzufügen
              </div>
            </div>
          </div>
        )}
      <Modal
        modalVisible={editmodalVisible}
        setModalVisible={setEditModalVisible}
        title="Teambearbeitung"
        data={teams.data}
        type="edit-teams"
      />
      <Modal
        modalVisible={addmodalVisible}
        setModalVisible={setAddModalVisible}
        title="Teambearbeitung"
        data={teams.data}
        type="add-missing-teams"
      />
    </div>
  );
}
export default EditBierpong;
