import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Calendar as CalendarIcon } from "lucide-react";

const OwnerProfileSettings = () => {
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Profile Settings</CardTitle>
                <CardDescription>
                  Manage how you appear to potential renters
                </CardDescription>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Select defaultValue="hostel">
                  <SelectTrigger>
                    <SelectValue placeholder="Select display name type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hostel">Use Hostel ID (H125)</SelectItem>
                    <SelectItem value="real">Use Real Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Custom Display Name</Label>
                <Input placeholder="Enter custom name" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Show Response Rate</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Total Rentals</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Availability Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Status</Label>
                <Select defaultValue="available">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="away">Away</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Regularly Available Times</Label>
                <div className="flex gap-2">
                  <Select defaultValue="monday">
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      {/* Add other days */}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="9am">
                    <SelectTrigger>
                      <SelectValue placeholder="Start" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      {/* Add other times */}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="5pm">
                    <SelectTrigger>
                      <SelectValue placeholder="End" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      {/* Add other times */}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="ghost" className="text-purple-600 p-0 h-auto">
                  + Add Time Slot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Profile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">H125</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Owner H125</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          Verified
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Response within 10 mins
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">4.8</span>
                      </div>
                      <span className="text-sm text-gray-500">12 rentals</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      Available Today
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProfileSettings;
