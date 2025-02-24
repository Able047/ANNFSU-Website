import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  HStack,
  Flex,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleZoomMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingRoom, setMeetingRoom] = useState('Meeting Room 1');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState('');

  const timeSlots = ['4:45 PM', '5:45 PM', '6:45 PM'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      meetingTitle,
      meetingRoom,
      selectedDate,
      selectedTime,
      participants,
    });
    //Form submission logic here
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="87vh">
    <Box
      maxW="600px"
      mx="auto"
      p={6}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      mt={8}
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Schedule a Zoom Meeting
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Meeting Title</FormLabel>
            <Input
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="Enter meeting title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Meeting Room</FormLabel>
            <Select
              value={meetingRoom}
              onChange={(e) => setMeetingRoom(e.target.value)}
            >
              <option>Meeting Room 1</option>
              <option>Meeting Room 2</option>
              <option>Meeting Room 3</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Meeting Date</FormLabel>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MM/dd/yyyy"
              className="chakra-datepicker"
              customInput={<Input />}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Meeting Time</FormLabel>
            <HStack spacing={3}>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  variant={selectedTime === time ? 'solid' : 'outline'}
                  colorScheme={selectedTime === time ? 'blue' : 'gray'}
                >
                  {time}
                </Button>
              ))}
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Participants</FormLabel>
            <Input
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Enter email addresses separated by commas"
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full" mt={4}>
            Schedule Meeting
          </Button>
        </VStack>
      </form>
    </Box>
    </Flex>
  );
};

export default ScheduleZoomMeeting;
