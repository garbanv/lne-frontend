import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";
import EditClientModal from "../../../../components/EditClientModal";
import DeleteClientModal from "../../../../components/DeleteClientModal";
import DeleteModal from "../../../../components/DeleteModal";
import ProfilePageBaselineData from "../../../../components/ProfilePageBaselineData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import BackButton from "../../../../components/BackButton";
import SubHeader from "../../../../components/SubHeader";

export default function ClientServiceActionPlansListPage({ data }) {
  console.log("datax", data);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgressNoteId, setSelectedProgressNoteId] = useState("");
  const [progNotes, setProgNotes] = useState([]);

  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const router = useRouter();

  return (
    <>
      <Layout>
        <ToastContainer autoClose={700} />

       {/*  <section className="pb-5 pt-10 md:px-0 px-5 bg-white ">
          <div className="container mx-auto">
            <div className="flex gap-x-3">
              <BackButton />
              <BackToDashboardButton />

              <button
                onClick={() =>
                  router.push(
                    `/clients/${data.client[0].clientid}/service-action-plan`
                  )
                }
                className="bg-yellow hover:bg-blue-300 px-3 py-2 rounded text-black inline-block  flex items-center"
              >
                Create Service Action Plan
              </button>
            </div>
            <h1 className="font-bold mt-7  "> Services Action Plans</h1>
          </div>
        </section> */}

        <SubHeader pageTitle="Service Action Plans">
          {<button
                onClick={() =>
                  router.push(
                    `/clients/${data.client[0].clientid}/service-action-plan`
                  )
                }
                className="blue-btn hover:bg-blue-300 px-3 py-2 rounded text-black inline-block  flex items-center gap-x-3"
              >
                <img src="/sap/create_service_action_plan_icon.svg" alt="" width={24}/>
                Create Service Action Plan
              </button>}

          </SubHeader>

          

        <section id="sap-dashboard">
          <div className="container mx-auto">
            <div className="sap-dashboard bg-white my-10 rounded-md shadow-md border-blue">
              <div className="sap-dashboard-client-information border-blue-bottom">
                <div className="flex items-center gap-x-3 py-5 px-5  self-start ">
                  <img
                    src="/support_groups/Past_group_events.png"
                    alt=""
                    className="grid items-center self-start"
                  />
                  <h1 className="font-black">Client information</h1>
                </div>
                <div className="flex items-center gap-x-5  px-5 pb-10">
                  <div>
                    <p className="text-lg">Plan start date</p>
                    <p className="bg-blue-50 rounded-md pl-2 pr-10 py-2 text-lg">
                      {" "}
                      {data?.clientData.length > 0
                        ? data?.clientData
                            .filter((client, index) => {
                              return client.status === "Current";
                            })
                            .map((client, index) => {
                              return new Date(
                                client.planstartdate
                              ).toLocaleDateString("en-US");
                            })
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">Client name</p>
                    <p className="bg-blue-50 rounded-md pl-2 pr-10 py-2 text-lg">
                      {" "}
                      {data?.client[0]?.clientfirstname}{" "}
                      {data?.client[0]?.clientlastname.charAt(0)}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg">Client ID</p>
                    <p className="bg-blue-50 rounded-md pl-2 pr-10 py-2 text-lg">
                      {" "}
                      {data?.client[0]?.clientid}
                    </p>
                  </div>
                </div>
              </div>

              <div className="sap-dashboard-client-services-action-plans pb-10">
                <div className="flex items-center gap-x-3 py-10 px-5  self-start ">
                  <img
                    src="/sap/Service_Action_Plan_table.svg"
                    alt=""
                    width={45}
                  />
                  <h1 className="font-black">Service Action Plans</h1>
                </div>

                <div className="sap-dashboard-client-table px-5 gap-x-2">
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-lg">
                    Plan start date
                  </p>
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-lg">
                    Status
                  </p>
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-center text-lg">
                    Edit
                  </p>
                </div>

                {data?.clientData.length > 0 ? (
                  data?.clientData
                    .sort(
                      (a, b) =>
                        new Date(a.planstartdate) - new Date(b.planstartdate)
                    )
                    .map((sap, index) => {
                      return (
                        <div
                          className={`sap-dashboard-client-table px-5 ${
                            index % 2 === 0 ? "bg-light-gray" : "bg-blue-50"
                          }`}
                          key={index}
                        >
                          <p className={`py-2 px-2 text-lg`}>
                            {new Date(sap.planstartdate).toLocaleDateString(
                              "en-US", {month: '2-digit', day: "2-digit", year: 'numeric'}
                            )}
                          </p>
                          <p className=" py-2 px-2 text-lg">
                            {`${sap.status}`}
                          </p>
                          <p className=" py-2 px-2 text-center flex items-center justify-center">
                            <Link
                              href={`/clients/${data?.client[0].clientid}/service-action-plan/${sap.sapid}/edit`}
                            >
                              <a
                                href={"/clients/devs"}
                                className="flex justify-center items-center"
                              >
                                <img src="/edit.svg" alt="edit icon" />
                              </a>
                            </Link>
                          </p>
                        </div>
                      );
                    })
                ) : (
                  <center className="mt-5 font-black">
                    <p>{`${
                      data?.client[0]?.clientfirstname
                    } ${data?.client[0]?.clientlastname.charAt(
                      0
                    )} has no Service Action Plan yet`}</p>
                  </center>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {showEditClientModal && (
        <EditClientModal
          user={user}
          data={data}
          showEditClientModal={showEditClientModal}
          setShowEditClientModal={setShowEditClientModal}
          notifyMessage={notifyMessage}
        />
      )}
      {showDeleteClientModal && (
        <DeleteClientModal
          data={data}
          showDeleteClientModal={showDeleteClientModal}
          setShowDeleteClientModal={setShowDeleteClientModal}
          notifyDeleteMessage={notifyDeleteMessage}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          //progressNotes={progressNotes}
          id={selectedProgressNoteId}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          notifyDeleteMessage={notifyDeleteMessage}
          whatToDelete={"Progress Note"}
        />
      )}
    </>
  );
}

/* export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const  response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`);
    const data = await  response.json();
    return { props: { data } };
  },
}); */

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const [data] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientid}/all/`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        data: data,
      },
    };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
