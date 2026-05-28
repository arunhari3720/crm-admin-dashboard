import { useEffect, useState } from "react";

import {
  Switch,
  message,
  Card,
  Typography,
  Spin,
} from "antd";

import API from "../services/api";

const { Title } = Typography;

const Permissions = () => {

  const [settings, setSettings] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // =========================================
  // FETCH SETTINGS
  // =========================================
  const fetchSettings = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        "/customerform-settings"
      );

      setSettings(res.data.data);

    } catch (error) {

      console.log(error);

      message.error(
        "Failed to fetch settings"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchSettings();

  }, []);


  // =========================================
  // HANDLE TOGGLE
  // =========================================
  const handleToggle = async (
    field,
    value
  ) => {

    try {

      const updatedSettings = {
        ...settings,

        [field]: value,
      };

      await API.put(
        "/customerform-settings/update",
        updatedSettings
      );

      setSettings(updatedSettings);

      message.success(
        "Settings updated"
      );

    } catch (error) {

      console.log(error);

      message.error(
        "Update failed"
      );

    }
  };


  if (loading || !settings) {

    return (

      <div className="flex justify-center items-center h-[300px]">

        <Spin size="large" />

      </div>
    );
  }


  return (

    <div className="p-5">

      <Card className="rounded-xl">

        <Title level={3}>
          Customer Form Settings
        </Title>


        <div className="space-y-6 mt-8">


          {/* VIEW */}
          <div className="flex items-center justify-between border-b pb-4">

            <h2 className="font-medium text-base">
              View Access
            </h2>

            <Switch
              checked={
                settings.view_active
              }

              onChange={(checked) =>
                handleToggle(
                  "view_active",
                  checked
                )
              }
            />

          </div>


          {/* EDIT */}
          <div className="flex items-center justify-between border-b pb-4">

            <h2 className="font-medium text-base">
              Edit Access
            </h2>

            <Switch
              checked={
                settings.edit_active
              }

              onChange={(checked) =>
                handleToggle(
                  "edit_active",
                  checked
                )
              }
            />

          </div>


          {/* DELETE */}
          <div className="flex items-center justify-between">

            <h2 className="font-medium text-base">
              Delete Access
            </h2>

            <Switch
              checked={
                settings.delete_active
              }

              onChange={(checked) =>
                handleToggle(
                  "delete_active",
                  checked
                )
              }
            />

          </div>

        </div>

      </Card>

    </div>
  );
};

export default Permissions;